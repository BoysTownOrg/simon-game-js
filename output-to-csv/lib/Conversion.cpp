#include "Conversion.hpp"
#include <nlohmann/json.hpp>
#include <string>

static auto booleanStringToIntegerString(const std::string &s) -> std::string {
    return std::string{s == "true" ? '1' : '0'};
}

static auto formattedMilliseconds(const std::string &s) -> std::string {
    return s + ".0";
}

static void addValueWithComma(std::string &s, const std::string &value) {
    s += value + ',';
}

static void addValueWithComma(std::string &s, int value) {
    addValueWithComma(s, std::to_string(value));
}

static void addBooleanStringValueWithComma(
    std::string &s, const std::string &value) {
    addValueWithComma(s, booleanStringToIntegerString(value));
}

auto convert(const std::string &json) -> std::string {
    if (json.empty())
        return {};

    std::string conversion;
    addValueWithComma(conversion, "Block");
    addValueWithComma(conversion, "RowCount");
    addValueWithComma(conversion, "position");
    addValueWithComma(conversion, "lengthPresented");
    addValueWithComma(conversion, "circleNum");
    addValueWithComma(conversion, "correct");
    addValueWithComma(conversion, "source");
    addValueWithComma(conversion, "isRandom");
    addValueWithComma(conversion, "TrialCount");
    conversion += "time\n";
    const auto parsed{nlohmann::json::parse(json)};
    const auto firstTrial{parsed.front()};
    const auto firstTrialBlock{firstTrial["block"].dump()};
    const auto firstTrialCorrect{firstTrial["correct"].dump()};
    const auto firstTrialIsRandom{firstTrial["isRandom"].dump()};
    const auto firstTrialSimon{firstTrial["simon"]};
    auto rowCount{1};
    for (auto simon : firstTrialSimon) {
        if (rowCount != 1)
            conversion += '\n';
        addValueWithComma(conversion, firstTrialBlock);
        addValueWithComma(conversion, rowCount);
        auto position{rowCount};
        addValueWithComma(conversion, position);
        auto lengthPresented{rowCount};
        addValueWithComma(conversion, lengthPresented);
        addValueWithComma(conversion, simon["id"].dump());
        addBooleanStringValueWithComma(conversion, firstTrialCorrect);
        addValueWithComma(conversion, "1");
        addBooleanStringValueWithComma(conversion, firstTrialIsRandom);
        addValueWithComma(conversion, "1");
        conversion += formattedMilliseconds(simon["milliseconds"].dump());
        ++rowCount;
    }
    const auto responseLengthPresented{rowCount - 1};
    auto responsePosition{1};
    for (auto response : firstTrial["responses"]) {
        if (rowCount != 1)
            conversion += '\n';
        addValueWithComma(conversion, firstTrialBlock);
        addValueWithComma(conversion, rowCount);
        addValueWithComma(conversion, responsePosition);
        addValueWithComma(conversion, responseLengthPresented);
        addValueWithComma(conversion, response["id"].dump());
        addBooleanStringValueWithComma(conversion, firstTrialCorrect);
        addValueWithComma(conversion, "0");
        addBooleanStringValueWithComma(conversion, firstTrialIsRandom);
        addValueWithComma(conversion, "1");
        conversion += formattedMilliseconds(response["milliseconds"].dump());
        ++rowCount;
        ++responsePosition;
    }
    return conversion;
}

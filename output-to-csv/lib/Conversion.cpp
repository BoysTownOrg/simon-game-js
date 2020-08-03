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
        addValueWithComma(conversion, firstTrialBlock);
        addValueWithComma(conversion, rowCount);
        auto position{rowCount};
        addValueWithComma(conversion, position);
        auto lengthPresented{rowCount};
        addValueWithComma(conversion, lengthPresented);
        addValueWithComma(conversion, simon["id"].dump());
        addValueWithComma(
            conversion, booleanStringToIntegerString(firstTrialCorrect));
        addValueWithComma(conversion, "1");
        addValueWithComma(
            conversion, booleanStringToIntegerString(firstTrialIsRandom));
        addValueWithComma(conversion, "1");
        conversion +=
            formattedMilliseconds(simon["milliseconds"].dump()) + "\n";
        ++rowCount;
    }
    const auto firstTrialFirstResponse{firstTrial["responses"].front()};
    const auto firstTrialFirstResponseMilliseconds{
        firstTrialFirstResponse["milliseconds"].dump()};
    const auto firstTrialFirstResponseId{firstTrialFirstResponse["id"].dump()};
    addValueWithComma(conversion, firstTrialBlock);
    addValueWithComma(conversion, rowCount);
    const auto position{1};
    addValueWithComma(conversion, position);
    const auto lengthPresented{firstTrialSimon.size()};
    addValueWithComma(conversion, std::to_string(lengthPresented));
    addValueWithComma(conversion, firstTrialFirstResponseId);
    addValueWithComma(
        conversion, booleanStringToIntegerString(firstTrialCorrect));
    addValueWithComma(conversion, "0");
    addValueWithComma(
        conversion, booleanStringToIntegerString(firstTrialIsRandom));
    addValueWithComma(conversion, "1");
    conversion += formattedMilliseconds(firstTrialFirstResponseMilliseconds);
    return conversion;
}

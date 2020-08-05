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
    const auto parsed = nlohmann::json::parse(json);
    auto rowCount{1};
    auto trialCount{1};
    for (auto trial : parsed) {
        if (!trial.contains("simon"))
            continue;
        const auto trialBlock{trial["block"].dump()};
        const auto trialCorrect{trial["correct"].dump()};
        const auto trialIsRandom{trial["isRandom"].dump()};
        const auto trialSimon = trial["simon"];
        auto simonCount{1};
        for (auto simon : trialSimon) {
            if (rowCount != 1)
                conversion += '\n';
            addValueWithComma(conversion, trialBlock);
            addValueWithComma(conversion, rowCount);
            auto position{simonCount};
            addValueWithComma(conversion, position);
            auto lengthPresented{simonCount};
            addValueWithComma(conversion, lengthPresented);
            addValueWithComma(conversion, simon["id"].dump());
            addBooleanStringValueWithComma(conversion, trialCorrect);
            addValueWithComma(conversion, "1");
            addBooleanStringValueWithComma(conversion, trialIsRandom);
            addValueWithComma(conversion, trialCount);
            conversion += formattedMilliseconds(simon["milliseconds"].dump());
            ++rowCount;
            ++simonCount;
        }
        const auto responseLengthPresented{simonCount - 1};
        auto responsePosition{1};
        for (auto response : trial["responses"]) {
            if (rowCount != 1)
                conversion += '\n';
            addValueWithComma(conversion, trialBlock);
            addValueWithComma(conversion, rowCount);
            addValueWithComma(conversion, responsePosition);
            addValueWithComma(conversion, responseLengthPresented);
            addValueWithComma(conversion, response["id"].dump());
            addBooleanStringValueWithComma(conversion, trialCorrect);
            addValueWithComma(conversion, "0");
            addBooleanStringValueWithComma(conversion, trialIsRandom);
            addValueWithComma(conversion, trialCount);
            conversion +=
                formattedMilliseconds(response["milliseconds"].dump());
            ++rowCount;
            ++responsePosition;
        }
        ++trialCount;
    }
    return conversion;
}

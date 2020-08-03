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

auto convert(const std::string &json) -> std::string {
    if (json.empty())
        return {};

    auto parsed{nlohmann::json::parse(json)};
    auto firstTrial{parsed.front()};
    auto block{firstTrial["block"].dump()};
    auto correct{firstTrial["correct"].dump()};
    auto firstSimonMilliseconds{
        firstTrial["simon"].front()["milliseconds"].dump()};
    auto firstResponseMilliseconds{
        firstTrial["responses"].front()["milliseconds"].dump()};
    auto isRandom{firstTrial["isRandom"].dump()};
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
    addValueWithComma(conversion, block);
    addValueWithComma(conversion, "1");
    addValueWithComma(conversion, "1");
    addValueWithComma(conversion, "1");
    addValueWithComma(conversion, "2");
    addValueWithComma(conversion, booleanStringToIntegerString(correct));
    addValueWithComma(conversion, "1");
    addValueWithComma(conversion, "0");
    addValueWithComma(conversion, "1");
    conversion += formattedMilliseconds(firstSimonMilliseconds) + "\n";
    addValueWithComma(conversion, block);
    addValueWithComma(conversion, "2");
    addValueWithComma(conversion, "1");
    addValueWithComma(conversion, "1");
    addValueWithComma(conversion, "2");
    addValueWithComma(conversion, booleanStringToIntegerString(correct));
    conversion += "0," + booleanStringToIntegerString(isRandom) + ",1," +
        formattedMilliseconds(firstResponseMilliseconds);
    return conversion;
}

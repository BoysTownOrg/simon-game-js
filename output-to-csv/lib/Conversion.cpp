#include "Conversion.hpp"
#include <nlohmann/json.hpp>
#include <string>

static auto booleanStringToIntegerString(const std::string &s) -> std::string {
    return std::string{s == "true" ? '1' : '0'};
}

static auto formattedMilliseconds(const std::string &s) -> std::string {
    return s + ".0";
}

auto convert(const std::string &json) -> std::string {
    if (json.empty())
        return {};

    auto parsed{nlohmann::json::parse(json)};
    auto first{parsed.front()};
    auto block{first["block"].dump()};
    auto correct{first["correct"].dump()};
    auto firstSimonMilliseconds{first["simon"].front()["milliseconds"].dump()};
    auto firstResponseMilliseconds{
        first["responses"].front()["milliseconds"].dump()};
    auto isRandom{first["isRandom"].dump()};
    return "Block,RowCount,position,lengthPresented,circleNum,correct,source,"
           "isRandom,TrialCount,time\n" +
        block + ",1,1,1,2," + booleanStringToIntegerString(correct) +
        ",1,0,1," + formattedMilliseconds(firstSimonMilliseconds) + "\n" +
        block + ",2,1,1,2," + booleanStringToIntegerString(correct) + ",0," +
        booleanStringToIntegerString(isRandom) + ",1," +
        formattedMilliseconds(firstResponseMilliseconds);
}

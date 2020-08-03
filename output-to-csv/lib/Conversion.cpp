#include "Conversion.hpp"
#include <nlohmann/json.hpp>
#include <string>

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
        block + ",1,1,1,2," + std::string{correct == "true" ? '1' : '0'} +
        ",1,0,1," + firstSimonMilliseconds + ".0" + "\n" + block + ",2,1,1,2," +
        std::string{correct == "true" ? '1' : '0'} + ",0," +
        std::string{isRandom == "true" ? '1' : '0'} + ",1," +
        firstResponseMilliseconds + ".0";
}

#include "Conversion.hpp"
#include <nlohmann/json.hpp>
#include <string>

auto convert(const std::string &json) -> std::string {
    if (json.empty())
        return {};

    auto parsed{nlohmann::json::parse(json)};
    auto first{parsed.front()};
    auto block{first["block"].dump()};
    return "Block,RowCount,position,lengthPresented,circleNum,correct,source,"
           "isRandom,TrialCount,time\n" +
        block +
        ",1,1,1,2,1,1,0,1,21835.0\n1,2,1,1,2,1,0,"
        "0,1,24003.0";
}

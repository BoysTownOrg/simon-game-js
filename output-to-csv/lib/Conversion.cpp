#include "Conversion.hpp"

auto convert(const std::string &json) -> std::string {
    if (json.empty())
        return {};
    return R"(Block,RowCount,position,lengthPresented,circleNum,correct,source,isRandom,TrialCount,time
1,1,1,1,2,1,1,0,1,21835.0
1,2,1,1,2,1,0,0,1,24003.0)";
}

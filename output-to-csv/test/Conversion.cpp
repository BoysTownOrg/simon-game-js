#include "Conversion.hpp"
#include <simon-game-js/output-to-csv/Conversion.hpp>
#include <testcpplite/testcpplite.hpp>
#include <string>

static void assertConversion(testcpplite::TestResult &result,
    const std::string &csv, const std::string &json) {
    assertEqual(result, csv, convert(json));
}

void emptyYieldsEmpty(testcpplite::TestResult &result) {
    assertConversion(result, "", "");
}

void oneTrialWithOneSimonToneAndOneResponseYieldsTwoRows(
    testcpplite::TestResult &result) {
    assertConversion(result,
        R"(Block,RowCount,position,lengthPresented,circleNum,correct,source,isRandom,TrialCount,time
1,1,1,1,2,1,1,0,1,21835.0
1,2,1,1,2,1,0,0,1,24003.0)",
        R"([
  {
    "correct": true,
    "responses": [{ "milliseconds": 24003, "id": 2 }],
    "simon": [{ "milliseconds": 21835, "id": 2 }],
    "color_key": { "red": 1, "green": 3, "yellow": 2, "blue": 4 },
    "color_locations": { "top": 1, "left": 3, "right": 4, "bottom": 2 },
    "block": 1,
    "isRandom": false,
    "trial_type": "simon-game-colored-circles",
    "trial_index": 1,
    "time_elapsed": 50000,
    "internal_node_id": "0.0-1.0-0.0"
  }
])");
}

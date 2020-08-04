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
    "responses": [{ "milliseconds": 24003, "id": 2 }],
    "correct": true,
    "color_key": { "red": 1, "green": 3, "yellow": 2, "blue": 4 },
    "simon": [{ "milliseconds": 21835, "id": 2 }],
    "color_locations": { "top": 1, "left": 3, "right": 4, "bottom": 2 },
    "isRandom": false,
    "block": 1,
    "trial_type": "simon-game-colored-circles",
    "trial_index": 1,
    "time_elapsed": 50000,
    "internal_node_id": "0.0-1.0-0.0"
  }
])");
}

void oneTrialWithTwoSimonTonesAndOneResponseYieldsThreeRows(
    testcpplite::TestResult &result) {
    assertConversion(result,
        R"(Block,RowCount,position,lengthPresented,circleNum,correct,source,isRandom,TrialCount,time
1,1,1,1,3,0,1,1,1,123.0
1,2,2,2,2,0,1,1,1,456.0
1,3,1,2,4,0,0,1,1,789.0)",
        R"([
  {
    "responses": [{ "milliseconds": 789, "id": 4 }],
    "simon": [
      { "milliseconds": 123, "id": 3 },
      { "milliseconds": 456, "id": 2 }
    ],
    "color_key": { "red": 1, "green": 3, "yellow": 2, "blue": 4 },
    "block": 1,
    "color_locations": { "top": 1, "left": 3, "right": 4, "bottom": 2 },
    "trial_type": "simon-game-colored-circles",
    "isRandom": true,
    "trial_index": 1,
    "correct": false,
    "time_elapsed": 1000,
    "internal_node_id": "0.0-1.0-0.0"
  }
])");
}

void oneTrialWithTwoSimonTonesAndTwoResponsesYieldsFourRows(
    testcpplite::TestResult &result) {
    assertConversion(result,
        R"(Block,RowCount,position,lengthPresented,circleNum,correct,source,isRandom,TrialCount,time
1,1,1,1,3,0,1,1,1,123.0
1,2,2,2,2,0,1,1,1,456.0
1,3,1,2,4,0,0,1,1,789.0
1,4,2,2,1,0,0,1,1,1010.0)",
        R"([
  {
    "correct": false,
    "responses": [
      { "milliseconds": 789, "id": 4 },
      { "milliseconds": 1010, "id": 1 }
    ],
    "time_elapsed": 1000,
    "color_key": { "red": 1, "green": 3, "yellow": 2, "blue": 4 },
    "color_locations": { "top": 1, "left": 3, "right": 4, "bottom": 2 },
    "isRandom": true,
    "block": 1,
    "trial_type": "simon-game-colored-circles",
    "trial_index": 1,
    "simon": [
      { "milliseconds": 123, "id": 3 },
      { "milliseconds": 456, "id": 2 }
    ],
    "internal_node_id": "0.0-1.0-0.0"
  }
])");
}

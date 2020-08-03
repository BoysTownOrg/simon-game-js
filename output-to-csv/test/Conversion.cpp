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

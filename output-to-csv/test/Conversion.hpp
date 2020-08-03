#ifndef SIMON_GAME_JS_OUTPUT_TO_CSV_TEST_CONVERSION_HPP_
#define SIMON_GAME_JS_OUTPUT_TO_CSV_TEST_CONVERSION_HPP_

namespace testcpplite {
struct TestResult;
}

void emptyYieldsEmpty(testcpplite::TestResult &);
void oneTrialWithOneSimonToneAndOneResponseYieldsTwoRows(
    testcpplite::TestResult &);

#endif

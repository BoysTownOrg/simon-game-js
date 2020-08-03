cmake_minimum_required(VERSION 3.14)
project(
  simon-game-js-output-to-csv
  VERSION 0.0.1
  LANGUAGES CXX)

if(${SIMON_GAME_JS_OUTPUT_TO_CSV_ENABLE_TESTS})
  include(FetchContent)
  FetchContent_Declare(
    testcpplite
    GIT_REPOSITORY https://github.com/sbash64/testcpplite
    GIT_TAG v1.1.3)
  FetchContent_MakeAvailable(testcpplite)

  add_subdirectory(test)
endif()

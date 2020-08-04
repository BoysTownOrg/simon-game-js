cmake_minimum_required(VERSION 3.14)
project(
  simon-game-js-output-to-csv
  VERSION 0.0.1
  LANGUAGES CXX)

include(FetchContent)

set(JSON_BuildTests
    OFF
    CACHE INTERNAL "")
FetchContent_Declare(
  json
  GIT_REPOSITORY
    https://github.com/ArthurSonzogni/nlohmann_json_cmake_fetchcontent
  GIT_TAG v3.9.0)
FetchContent_MakeAvailable(json)

add_subdirectory(lib)

add_executable(simon-game-js-output-to-csv-main main.cpp)
set_target_properties(simon-game-js-output-to-csv-main
                      PROPERTIES OUTPUT_NAME simon-game-js-output-to-csv)
target_link_libraries(simon-game-js-output-to-csv-main
                      PRIVATE simon-game-js-output-to-csv)
target_compile_options(simon-game-js-output-to-csv-main
                       PRIVATE ${SIMON_GAME_JS_OUTPUT_TO_CSV_WARNINGS})
target_compile_features(
  simon-game-js-output-to-csv-main PRIVATE cxx_trailing_return_types
                                           cxx_uniform_initialization)

if(${SIMON_GAME_JS_OUTPUT_TO_CSV_ENABLE_TESTS})
  enable_testing()

  FetchContent_Declare(
    testcpplite
    GIT_REPOSITORY https://github.com/sbash64/testcpplite
    GIT_TAG v1.1.3)
  FetchContent_MakeAvailable(testcpplite)

  add_subdirectory(test)
endif()

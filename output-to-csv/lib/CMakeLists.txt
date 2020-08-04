add_library(simon-game-js-output-to-csv Conversion.cpp)
target_include_directories(simon-game-js-output-to-csv PUBLIC include)
target_include_directories(simon-game-js-output-to-csv
                           PRIVATE include/simon-game-js/output-to-csv)
target_link_libraries(simon-game-js-output-to-csv
                      PRIVATE nlohmann_json::nlohmann_json)
target_compile_options(simon-game-js-output-to-csv
                       PRIVATE ${SIMON_GAME_JS_OUTPUT_TO_CSV_WARNINGS})
target_compile_features(simon-game-js-output-to-csv
                        PRIVATE cxx_uniform_initialization)
target_compile_features(simon-game-js-output-to-csv
                        PUBLIC cxx_trailing_return_types)

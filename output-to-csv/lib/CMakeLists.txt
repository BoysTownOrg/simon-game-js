add_library(simon-game-js-output-to-csv Conversion.cpp)
target_include_directories(simon-game-js-output-to-csv PUBLIC include)
target_include_directories(simon-game-js-output-to-csv
                           PRIVATE include/simon-game-js/output-to-csv)
target_compile_options(simon-game-js-output-to-csv
                       PRIVATE ${SIMON_GAME_JS_OUTPUT_TO_CSV_WARNINGS})

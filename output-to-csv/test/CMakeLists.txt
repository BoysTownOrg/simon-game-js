add_executable(simon-game-js-output-to-csv-tests main.cpp)
target_link_libraries(simon-game-js-output-to-csv-tests PRIVATE testcpplite)
target_compile_options(simon-game-js-output-to-csv-tests
                       PRIVATE ${SIMON_GAME_JS_OUTPUT_TO_CSV_WARNINGS})

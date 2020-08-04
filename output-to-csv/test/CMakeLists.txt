add_executable(simon-game-js-output-to-csv-tests main.cpp Conversion.cpp)
target_link_libraries(simon-game-js-output-to-csv-tests
                      PRIVATE simon-game-js-output-to-csv testcpplite)
target_compile_options(simon-game-js-output-to-csv-tests
                       PRIVATE ${SIMON_GAME_JS_OUTPUT_TO_CSV_WARNINGS})

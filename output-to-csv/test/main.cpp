#include "Conversion.hpp"
#include <testcpplite/testcpplite.hpp>
#include <iostream>

int main() {
    return testcpplite::test(
        {{emptyYieldsEmpty, "emptyYieldsEmpty"}}, std::cout);
}

#include <simon-game-js/output-to-csv/Conversion.hpp>
#include <iostream>
#include <fstream>
#include <filesystem>

// https://stackoverflow.com/a/116220
static auto read_file(const std::filesystem::path &url) -> std::string {
    constexpr auto read_size = std::size_t{4096};
    auto stream = std::ifstream{url};
    stream.exceptions(std::ios_base::badbit);

    auto out = std::string{};
    auto buf = std::string(read_size, '\0');
    while (stream.read(&buf[0], read_size)) {
        out.append(buf, 0, stream.gcount());
    }
    out.append(buf, 0, stream.gcount());
    return out;
}

int main(int argc, char **argv) {
    if (argc > 1)
        std::cout << convert(read_file(argv[1])) << '\n';
}

source "https://rubygems.org"

# Use the github-pages gem so local builds match GitHub Pages exactly.
gem "github-pages", group: :jekyll_plugins

# Lock down platform-specific gems for portability.
gem "webrick", "~> 1.8"

platforms :mingw, :x64_mingw, :mswin, :jruby do
  gem "tzinfo", ">= 1", "< 3"
  gem "tzinfo-data"
end

module.exports = function () {
  var instanceRoot = "C:\\websites\\Habitat.Jango";
  var config = {
    websiteRoot: instanceRoot + "\\Website",
    sitecoreLibraries: instanceRoot + "\\Website\\bin",
    licensePath: instanceRoot + "\\Data\\license.xml",
    solutionName: "habitat.jango",
    buildConfiguration: "Debug",
    runCleanBuilds: false
  };
  return config;
}
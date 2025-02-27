using System.Diagnostics;
using System.Diagnostics.CodeAnalysis;
using Microsoft.Extensions.Configuration;

namespace PrePass.ChoresMediator.Tests.Helpers;

[ExcludeFromCodeCoverage]
internal static class LocalCommon
{
    #region " Private Fields "


    #endregion
    
    #region " internal Fields "
    
    internal static IConfiguration TestConfiguration = new ConfigurationManager();

    #endregion

    #region " internal Functions "
    
    #endregion

    #region " Private Functions "

    public static void InitializeConfiguration()
    {
        TestConfiguration = new ConfigurationBuilder()
            .SetBasePath(Directory.GetCurrentDirectory())
            .AddJsonFile($"appsettings.{Environment.GetEnvironmentVariable("ASPNETCORE_ENVIRONMENT") ?? "Development"}.json", optional: true, reloadOnChange: true)
            .Build();
    }

    #endregion
}
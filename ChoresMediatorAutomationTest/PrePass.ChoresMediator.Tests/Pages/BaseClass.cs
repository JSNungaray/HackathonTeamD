using Microsoft.Playwright.MSTest;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using PrePass.ChoresMediator.Tests.Helpers;

namespace PrePass.ChoresMediator.Tests.Pages
{

    public class BaseClass : PageTest
    {
        protected string? ValidAdminEmail { get; private set; }
        protected string? ValidAdminPassword { get; private set; }


        [TestInitialize]
        public async Task TestInitialize()
        {
            LocalCommon.InitializeConfiguration();
            string? ApplicationURL = LocalCommon.TestConfiguration["ApplicationURL"];
            ValidAdminEmail = LocalCommon.TestConfiguration["ValidAdminEmail"];
            ValidAdminPassword = LocalCommon.TestConfiguration["ValidAdminPassword"];
            Page.SetDefaultTimeout(120000);

            await Page.SetViewportSizeAsync(1200, 670); //(1200, 670); //(1920, 1080)

            if (ApplicationURL != null)
            {
                await Page.GotoAsync(ApplicationURL);
            }
            else
            {
                throw new Exception("ApplicationURL is null.");
            }

            // Maximize the window using JavaScript
            await Page.EvaluateAsync(@"window.moveTo(0, 0); window.resizeTo(screen.availWidth, screen.availHeight);");

        }

        [TestCleanup]
        public async Task TestCleanup()
        {
            await Page.CloseAsync();
        }
    }
}

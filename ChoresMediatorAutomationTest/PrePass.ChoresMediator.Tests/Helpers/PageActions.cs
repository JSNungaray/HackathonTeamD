using System.Globalization;
using System.Xml.Linq;
using Microsoft.Extensions.Configuration;
using Microsoft.Playwright;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Newtonsoft.Json.Linq;
using PrePass.ChoresMediator.Tests.Pages;

namespace PrePass.ChoresMediator.Tests.Helpers
{
    public class PageActions
    {
        private readonly IPage _page;
        private readonly HomePage _homePage;

        public PageActions(IPage page)
        {
            _page = page;
            _homePage = new HomePage(_page); // Ensure this is properly initialized
        }

        //----------------------------------------------------------------------------------------------------------------------------------------------------
        //                                                                      [NAVBAR] LOCATORS
        //----------------------------------------------------------------------------------------------------------------------------------------------------
        //NavBar
        /*
        public ILocator NavBarHome => _page.GetByRole(AriaRole.Link, new() { Name = "Home" });
        public ILocator NavBarActivitySearch => _page.GetByRole(AriaRole.Link, new() { Name = "Activity Search" });
        public ILocator NavBarReports => _page.GetByRole(AriaRole.Link, new() { Name = "Reports" });
        public ILocator NavBarHelp => _page.GetByRole(AriaRole.Link, new() { Name = "Help" });
        public ILocator NavBarConfigurationPage => _page.GetByRole(AriaRole.Link, new() { Name = "Configuration page" });
        public ILocator NavBarSitesDropdown => _page.GetByRole(AriaRole.Button, new() { Name = "Sites" });
        public ILocator NavBarSitesDropdownId => _page.Locator("#navbarSiteDropdown");
        public ILocator NavBarSitesDropdownALink => _page.Locator("ul.dropdown-menu a");
        public ILocator NavBarHello => _page.Locator("span#navGreeting");
        public ILocator NavBarWelcomeUsername => _page.Locator("span#navUsername");
        public ILocator LnkLogin => _page.Locator("#NavBarSupportedContent > div > a");
        public ILocator LnkLogout => _page.Locator("#NavBarSupportedContent > div > button");

        //----------------------------------------------------------------------------------------------------------------------------------------------------
        //                                                                      [NAVBAR] STRING FOR ASSERTION
        //----------------------------------------------------------------------------------------------------------------------------------------------------
        //Assert String [NavBar] - Begin
        public static readonly string StrNavBarHome = "Home";
        public static readonly string StrNavBarActivitySearch = "Activity Search";
        public static readonly string StrNavBarReports = "Reports";
        public static readonly string StrNavBarHelp = "Help";
        public static readonly string StrNavBarConfigurationPage = "Configuration Page";
        public static readonly string StrNavBarSitesDropdown = "Sites";
        public static readonly string StrNavBarHello = "Hello,";
        public static readonly string StrLnkLogin = "Log in";
        public static readonly string StrLnkLogout = "Log out";
        //Expected String [NavBar] - End

        public static async Task<string> GetSiteValue()
        {
            var siteconfig = new ConfigurationBuilder()
                            .SetBasePath(Directory.GetCurrentDirectory())
                            .AddJsonFile(Path.Combine("TestData", "APItests_TestData.json"), optional: true, reloadOnChange: true)
                            .Build();
            string? siteId = siteconfig["TestSettings:TestSiteId"];
            Console.WriteLine("siteId:" + siteId);
            if (siteId == null)
            {
                throw new Exception("SiteId is null");
            }
            else
            {
                return await Task.FromResult(siteId);
            }

        }


        public async Task NavigateToASiteFromHomePageSitesDropDown(string siteId)
        {
            int attempt = 0;
            int maxRetries = 3;
            try
            {

                Console.WriteLine("Begin Action: NavigateToASiteFromDropDown");
                int i = 0;
                int count = 0;
                await _page.WaitForLoadStateAsync(LoadState.NetworkIdle);
                await _page.WaitForURLAsync(_page.Url);

       //New Retry logic
                for (attempt = 0; attempt < maxRetries; attempt++)
                {
                    await _page.WaitForLoadStateAsync(LoadState.NetworkIdle);
                    await _page.WaitForURLAsync(_page.Url);
                    //Click SiteDropdown
                    await NavBarSitesDropdownId.ClickAsync();
                    // Wait for the dropdown to appear
                    await _page.WaitForSelectorAsync("#navbarSiteDropdown", new PageWaitForSelectorOptions { Timeout = 5000 });
                    // If the dropdown appears, break out of the loop
                    if (await NavBarSitesDropdownALink.Nth(0).IsVisibleAsync())
                    {
                        break;
                    }
                }
                count = await NavBarSitesDropdownALink.CountAsync();
                for (i = 0; i <= count; i++)
                {
                    string? attribute = await NavBarSitesDropdownALink.Nth(i).GetAttributeAsync("id");
                    if (attribute != null && attribute.Contains(siteId))
                    {
                        Console.WriteLine("-------> Site Found: " + siteId);
                        await NavBarSitesDropdownALink.Nth(i).ClickAsync();
                        await _page.WaitForLoadStateAsync(LoadState.NetworkIdle);
                        await _page.WaitForURLAsync(_page.Url);
                        break;
                    }
                }
            }
            catch (TimeoutException)
            {
                if (attempt == maxRetries - 1)
                {
                    throw; // Rethrow the error if all retries are exhausted
                }
                Console.WriteLine($"Retrying navigation, attempt {attempt + 1}");
            }

            Console.WriteLine("End Action: NavigateToASiteFromDropDown");
        }
        public async Task NavigateTo_UTSite_From_SitesDropDown()
        {
            try
            {
                await NavBarSitesDropdown.ClickAsync();
                await _page.ReloadAsync(); //remove this line after fixing the Sites visibility upon reload issue
                await NavBarSitesDropdown.ClickAsync();//remove this line after fixing the Sites visibility upon reload issue
                var siteOption_9906 = _page.Locator("#SiteSelection-9906");
                await siteOption_9906.ClickAsync();
                Console.WriteLine("Navigated to UT Site");
            }
            catch (System.Exception ex)
            {
                Console.WriteLine($"Error in Navigate to site From DropDown: {ex.Message}");
                throw;
            }
        }
        public async Task SearchForPlateAndState(string licensePlate, string state)
        {
            Console.WriteLine("--------------------Begin Action: SearchForPlateAndState-------------------------");
            try
            {
                await _homePage.SearchContainerPlateTxt.FillAsync(licensePlate);
                await _homePage.SearchContainerStateTxt.FillAsync(state);
                await _homePage.SearchContainerSubmitBtn.ClickAsync();
                await _homePage.SummaryBoxDetailsBtn.WaitForAsync(); // Fix applied here
                // Wait for the SummaryBoxDetailsBtn to be visible
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error: {ex.Message}");
                throw;
            }
            Console.WriteLine("-----------------------------End Action: SearchForPlateAndState ---------------------");
        }
        */
    }
}

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
        //                                                                     CHORES LOCATORS
        //----------------------------------------------------------------------------------------------------------------------------------------------------
        public ILocator NavBarHome => _page.GetByRole(AriaRole.Link, new() { Name = "Home" });
    }
}

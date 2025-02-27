using System.Reflection.Metadata;
using Microsoft.Playwright;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using PrePass.ChoresMediator.Tests.Tests;
using static System.Net.Mime.MediaTypeNames;
using System.Data.SqlClient;
using System.Net.Sockets;
using PrePass.ChoresMediator.Tests.Helpers;
using System.Diagnostics.Metrics;
using System.Runtime.Intrinsics.X86;


namespace PrePass.ChoresMediator.Tests.Pages
{
    public class HomePage
    {
        private readonly IPage _page;

        public HomePage(IPage page)
        {
            _page = page;
        }

        //----------------------------------------------------------------------------------------------------------------------------------------------------
        //                                                                     CHORES HOMEPAGE LOCATORS
        //----------------------------------------------------------------------------------------------------------------------------------------------------
        public ILocator BtnAddFamilyMember => _page.GetByTestId("add-family-member-button");
        public ILocator LblAddFamilyMember => _page.Locator("[data - slot = 'dialog-title']");
        public ILocator LblAddFamilyMemberDesc => _page.Locator("[data - slot = 'dialog-description']");
        public ILocator LblAddFamilyMemberName => _page.GetByLabel("Name");
        public ILocator LblAddFamilyMemberRole => _page.GetByLabel("Role");
        public ILocator TxtAddFamilyMemberName => _page.GetByTestId("family-member-name-input");
        public ILocator TxtAddFamilyMemberRole => _page.GetByTestId("family-member-role-input");
        public ILocator BtnAddMember => _page.GetByTestId("add-family-member-button");
        public ILocator BtnCancel => _page.GetByTestId("add-family-member-button");

        //All Button
        public ILocator BtnAll => _page.GetByTestId("filter-all");
        //Unassigned Button
        public ILocator BtnUnassigned => _page.GetByTestId("filter-unassigned");

    }
}


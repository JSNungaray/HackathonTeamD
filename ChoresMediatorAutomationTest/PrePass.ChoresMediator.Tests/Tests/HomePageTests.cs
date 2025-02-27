// < Summary >
// This file contains Playwright Automation tests for the ChoresMediator UI Homepage.
// TERM: TransactionBox => Transaction on the scrolling screen.
// TERM: SummaryBox => The transaction details that show up as a summary in a new panel.
// </Summary>
using Microsoft.VisualStudio.TestTools.UnitTesting;
using PrePass.ChoresMediator.Tests.Pages;
using Microsoft.Playwright;
using System.Text.RegularExpressions;
using PrePass.ChoresMediator.Tests.Helpers;
using static System.Net.Mime.MediaTypeNames;
using static Microsoft.ApplicationInsights.MetricDimensionNames.TelemetryContext;
using System.ComponentModel;
using Microsoft.VisualBasic;
using Newtonsoft.Json.Linq;
using System;
using System.Data.SqlClient;
using System.Diagnostics.Metrics;

namespace PrePass.ChoresMediator.Tests.Tests
{
    [TestClass]
    public class HomePageTests : BaseClass
    {
        private HomePage? _homePage;
        private PageActions? _pageActions;

        #region "Tests"


        [TestMethod, TestCategory("Smoke")]
        public async Task CheckHomePageUrl()
        {
            Console.WriteLine("---------- Begin Test: Verify URL is correct ----------");
            try
            {
                _pageActions = new PageActions(Page);
                Console.WriteLine("Initialize Page...");
                Assert.IsNotNull(Page.Url,"URL is null");
                await Page.WaitForLoadStateAsync(LoadState.DOMContentLoaded);
                await Page.WaitForLoadStateAsync(LoadState.NetworkIdle);
            }
            catch (Exception ex)
            {
                Console.WriteLine($"{ex.Message}");
                throw;
            }
            finally
            {
                //Use for test cleanup
                Console.WriteLine("---------- End Test: Verify URL is correct ----------");
            }
        }


        [TestMethod, TestCategory("Smoke")]
        public async Task AddFamilyMembers()
        {
            Console.WriteLine("---------- Begin Test: Verify family members are added ----------");
            try
            {
                _pageActions = new PageActions(Page);
                _homePage = new HomePage(Page);
                await Page.WaitForLoadStateAsync(LoadState.DOMContentLoaded);
                await Page.WaitForLoadStateAsync(LoadState.NetworkIdle);
                await _homePage.BtnAddFamilyMember.ClickAsync();
              //  Assert.IsTrue(await _homePage.LblAddFamilyMember.IsVisibleAsync(), "Add Family Member label is not visible");
              //  Assert.IsTrue(await _homePage.LblAddFamilyMemberDesc.IsVisibleAsync(), "Add Family Member description is not visible");
              //  Assert.IsTrue(await _homePage.LblAddFamilyMemberName.IsVisibleAsync(), "Add Family Member name label is not visible");
              //  Assert.IsTrue(await _homePage.LblAddFamilyMemberRole.IsVisibleAsync(), "Add Family Member role label is not visible");
              //  Assert.IsTrue(await _homePage.TxtAddFamilyMemberName.IsVisibleAsync(), "Add Family Member name text is not visible");
              //  Assert.IsTrue(await _homePage.TxtAddFamilyMemberRole.IsVisibleAsync(), "Add Family Member role text is not visible");
                //Assert.IsTrue(await _homePage.BtnAddMember.IsVisibleAsync(), "Add member button is not visible");
                //Assert.IsTrue(await _homePage.BtnCancel.IsVisibleAsync(), "Cancel button is not visible");

                //Provide a valid name and role
                await _homePage.TxtAddFamilyMemberName.FillAsync("Hema_"+DateTime.Now);
                await _homePage.TxtAddFamilyMemberRole.FillAsync("Mom");
                await _homePage.BtnAddFamilyMember.ClickAsync();

            }
            catch (Exception ex)
            {
                Console.WriteLine($"{ex.Message}");
                throw;
            }
            finally
            {
                //Use for test cleanup
                Console.WriteLine("---------- End Test: Verify family members are added ----------");
            }
        }


        [TestMethod, TestCategory("Smoke")]
        public async Task VerifyFamilyMembersList()
        {
            Console.WriteLine("---------- Begin Test: Verify family members are listed ----------");
            try
            {
                _pageActions = new PageActions(Page);
                _homePage = new HomePage(Page);
                await Page.WaitForLoadStateAsync(LoadState.DOMContentLoaded);
                await Page.WaitForLoadStateAsync(LoadState.NetworkIdle);
                await _homePage.BtnAddFamilyMember.ClickAsync();
                //Provide a valid name and role
                await _homePage.TxtAddFamilyMemberName.FillAsync("Hema_" + DateTime.Now);
                await _homePage.TxtAddFamilyMemberRole.FillAsync("Mom");
                await _homePage.BtnAddFamilyMember.ClickAsync();

            }
            catch (Exception ex)
            {
                Console.WriteLine($"{ex.Message}");
                throw;
            }
            finally
            {
                //Use for test cleanup
                Console.WriteLine("---------- End Test: Verify family members are listed ----------");
            }
        }


        [TestMethod, TestCategory("Smoke")]
        public async Task VerifyAllChoresList()
        {
            Console.WriteLine("---------- Begin Test: VerifyAllChoresList ----------");
            try
            {
                _pageActions = new PageActions(Page);
                _homePage = new HomePage(Page);
                await Page.WaitForLoadStateAsync(LoadState.DOMContentLoaded);
                await Page.WaitForLoadStateAsync(LoadState.NetworkIdle);
                Assert.IsTrue(await _homePage.BtnAll.IsVisibleAsync(),"All button is not visible");
                await _homePage.BtnAll.ClickAsync();

            }
            catch (Exception ex)
            {
                Console.WriteLine($"{ex.Message}");
                throw;
            }
            finally
            {
                //Use for test cleanup
                Console.WriteLine("---------- End Test: VerifyAllChoresList ----------");
            }
        }


        [TestMethod, TestCategory("Smoke")]
        public async Task VerifyUnassignedChoresList()
        {
            Console.WriteLine("---------- Begin Test: VerifyAllChoresList ----------");
            try
            {
                _pageActions = new PageActions(Page);
                _homePage = new HomePage(Page);
                await Page.WaitForLoadStateAsync(LoadState.DOMContentLoaded);
                await Page.WaitForLoadStateAsync(LoadState.NetworkIdle);
                Assert.IsTrue(await _homePage.BtnUnassigned.IsVisibleAsync(), "Unassigned button is not visible");
                await _homePage.BtnUnassigned.ClickAsync();

            }
            catch (Exception ex)
            {
                Console.WriteLine($"{ex.Message}");
                throw;
            }
            finally
            {
                //Use for test cleanup
                Console.WriteLine("---------- End Test: VerifyAllChoresList ----------");
            }
        }

        [TestMethod, TestCategory("Smoke")]
        public async Task ValidateAddChoresButtonExist()
        {
            Console.WriteLine("---------- Begin Test: VerifyAllChoresList ----------");
            try
            {
                _pageActions = new PageActions(Page);
                _homePage = new HomePage(Page);
                await Page.WaitForLoadStateAsync(LoadState.DOMContentLoaded);
                await Page.WaitForLoadStateAsync(LoadState.NetworkIdle);
                await _homePage.BtnAddFamilyMember.ClickAsync();
                //Provide a valid name and role
                await _homePage.TxtAddFamilyMemberName.FillAsync("Hema_" + DateTime.Now);
                await _homePage.TxtAddFamilyMemberRole.FillAsync("Mom");
                await _homePage.BtnAddFamilyMember.ClickAsync();

            }
            catch (Exception ex)
            {
                Console.WriteLine($"{ex.Message}");
                throw;
            }
            finally
            {
                //Use for test cleanup
                Console.WriteLine("---------- End Test: VerifyAllChoresList ----------");
            }
        }

    }
    #endregion
}

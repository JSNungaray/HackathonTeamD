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
        public async Task CheckHomePageUrl_BadUrl()
        {
            Console.WriteLine("---------- Begin Test: Verify Incorrect Url ----------");
            try
            {
                _pageActions = new PageActions(Page);
                Console.WriteLine("Initialize Page...");
                await Page.GotoAsync("http://localhost:5172/index.html");
            }
            catch (Exception ex)
            {
                Console.WriteLine("Incorrect URL!");
                throw;
            }
            finally
            {
                //Use for test cleanup
                Console.WriteLine("---------- End Test:  Verify Incorrect Url ----------");
            }
        }




        [TestMethod, TestCategory("Smoke")]
        public async Task ValidateChoreCardCountFirstMember()
        {
            Console.WriteLine("---------- Begin Test: VerifyAllChoresList  ----------");
            try
            {
                _pageActions = new PageActions(Page);
                _homePage = new HomePage(Page);
                await Page.WaitForLoadStateAsync(LoadState.DOMContentLoaded);
                await Page.WaitForLoadStateAsync(LoadState.NetworkIdle);
                Page.Locator("[data-testid*='chore-card']");
                // Locator for elements with data-slot="card"
                var locator = Page.Locator("[data-slot='card']");
                await locator.First.ClickAsync();
                var locator_chore = Page.Locator("[data-slot='card-content']");

                // Perform actions or assertions with the locator
                var count = await locator_chore.CountAsync();
                if (count > 0)
                {
                    Console.WriteLine($"Found {count} Chore Card");
                }
                else
                {
                    Console.WriteLine("No Chore cards found for this person.");
                }
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

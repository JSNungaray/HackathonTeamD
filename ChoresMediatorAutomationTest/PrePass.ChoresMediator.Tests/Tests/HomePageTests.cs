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
    }
    #endregion
}

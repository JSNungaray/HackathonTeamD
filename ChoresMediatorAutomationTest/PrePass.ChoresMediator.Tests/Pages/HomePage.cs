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

        //Search Container
        public ILocator SearchContainerPlateLbl => _page.GetByText("Plate", new() { Exact = true });
        public ILocator SearchContainerPlateTxt => _page.Locator("#LprSearchField");
        public ILocator SearchContainerStateLbl => _page.GetByText("State", new() { Exact = true });
        public ILocator SearchContainerStateTxt => _page.GetByPlaceholder("State");
        public ILocator SearchContainerDotLbl => _page.GetByText("DOT", new() { Exact = true });
        public ILocator SearchContainerDotTxt => _page.GetByPlaceholder("Dot");
        public ILocator SearchContainerSubmitBtn => _page.Locator("#IndexSearchSubmit");
        public ILocator SearchContainerLanesViewedDropdown => _page.GetByRole(AriaRole.Button, new() { Name = "Lanes viewed" });


        //Transaction Box
        public ILocator TransactionBox => _page.Locator("div[id*='TransactionBox']").Nth(0); 
        public ILocator TransactionBoxOvrImageBox => _page.Locator("div[id*='OverviewImgNotFound']").Nth(0);
        public ILocator TransactionBoxLprImageBox => _page.Locator("div[id*='LprImgNotFound']").Nth(0); 
        public ILocator TransactionBoxDotImageBox => _page.Locator("div[id*='DotImgNotFound']").Nth(0);
        public ILocator TransactionBoxCarrierName => _page.Locator("p[id*='CarrierName']").Nth(0);  
        public ILocator TransactionBoxPlateText => _page.Locator("span[id*='LicensePlateNumber']").Nth(0);
        public ILocator TransactionBoxPlate_FindByText(string plate) => _page.GetByText(plate).First;
        public ILocator TransactionBoxStateText => _page.Locator("span[id*='LicensePlateState']").Nth(0);
        public ILocator TransactionBoxDotText => _page.Locator("span[id*='DotNumber']").Nth(0);
        public ILocator TransactionBoxTransactionGeneratedTimeStamp => _page.Locator("p[id*='TransactionGeneratedTimeStamp']").Nth(0);   


        //Summary Box
        public ILocator SummaryBox => _page.Locator("div[id*='TransactionSummary']").Nth(0);
        public ILocator SummaryBoxOvrImageBox => _page.Locator("div[id*='OverviewImgNotFound']").Nth(0);
        public ILocator SummaryBoxLprImageBox => _page.Locator("div[id*='LprImgNotFound']").Nth(0); 
        public ILocator SummaryBoxDotImageBox => _page.Locator("div[id*='OverviewImgNotFound']").Nth(0); 
        public ILocator SummaryBoxCarrierName => _page.Locator("[id=TransactionSummaryCarrierName]");
        public ILocator SummaryBoxPlateText => _page.Locator("#TransactionSummaryPlateNumber");
        public ILocator SummaryBoxStateText => _page.Locator("#TransactionSummaryLprState");
        public ILocator SummaryBoxDotText => _page.Locator("#TransactionSummaryDotNumber");
        public ILocator SummaryBoxTransactionGeneratedTimeStamp => _page.Locator("p.TransactionSummaryGeneratedTimeStamp");
        public ILocator SummaryBoxDetailsBtn => _page.Locator("#MoreDetailsBtn");
        public ILocator SummaryBoxSubmitBtn => _page.Locator("#UpdateSummarySubmit");
        public ILocator SummaryBoxCloseBtn => _page.Locator("#CloseSummaryBtn");


        //Summary CarrierFactors List
        public ILocator SummaryTruckFactorsId => _page.Locator("#SummaryTruckFactors TR TD");
        public ILocator SummaryTruckFactorsAlerts => _page.Locator("#SummaryTruckFactors TR");

        //Summary Carrier Factors List
        public ILocator SummaryCarrierFactorsId => _page.Locator("#SummaryCarrierFactors TR TD");
        public ILocator SummaryCarrierFactorsAlerts => _page.Locator("#SummaryCarrierFactors TR");

        //Expected String [Search Container] - Begin
        public static readonly string StrSearchContainerPlateLbl = "Plate";
        public static readonly string StrSearchContainerStateLbl = "State";
        public static readonly string StrSearchContainerDotLbl = "DOT";
        public static readonly string StrSearchContainerBtnSubmit = "Submit";
        public static readonly string StrSearchContainerLanesViewedDropdown = "Lanes viewed";
        //Expected String [Search Container] - End

        //Expected String [TransactionBox] - Begin
        public static readonly string StrTransactionBoxCarrierName = "Plate";
        public static readonly string StrTransactionBoxPlate = "State";
        public static readonly string StrTransactionBoxState = "DOT";
        public static readonly string StrTransactionBoxDot = "Submit";
        public static readonly string StrTransactionBoxTransactionGeneratedTimeStamp = "Lanes viewed";
        //Expected String [Transaction Box] - End


        //Action Method: NavigateToSummaryBox
        public async Task NavigateToSummaryBox()
        {
            Console.WriteLine("Begin Action: NavigateToSummaryBox");
            await TransactionBox.ClickAsync();
            Console.WriteLine("Navigated To SummaryBox...");
            Console.WriteLine("End Action: NavigateToSummaryBox ");
        }


        //Action Method: NavigateToViewDetailsPage
        public async Task NavigateToViewDetailsPage()
        {
            Console.WriteLine("Begin Action: NavigateToViewDetailsPage");
            await NavigateToSummaryBox();
            await SummaryBoxDetailsBtn.ClickAsync();  //Click Details Button to go to ViewDetailsPage
            await _page.WaitForLoadStateAsync();
            Console.WriteLine("Navigated to ViewDetailsPage...");
            Console.WriteLine("End Action: NavigateToViewDetailsPage");
        }

    }
}


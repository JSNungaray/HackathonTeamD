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

        //Container
        public ILocator SearchContainerPlateLbl => _page.GetByText("Plate", new() { Exact = true });

    }
}


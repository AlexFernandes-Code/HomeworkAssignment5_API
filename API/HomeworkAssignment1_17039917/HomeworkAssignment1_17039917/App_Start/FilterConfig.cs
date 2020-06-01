using System.Web;
using System.Web.Mvc;

namespace HomeworkAssignment1_17039917
{
    public class FilterConfig
    {
        public static void RegisterGlobalFilters(GlobalFilterCollection filters)
        {
            filters.Add(new HandleErrorAttribute());
        }
    }
}

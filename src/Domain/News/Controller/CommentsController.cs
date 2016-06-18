using System.Web.Mvc;
using Habitat.Framework.SitecoreExtensions.Extensions;
using Habitat.News.Repositories;
using Sitecore.Mvc.Presentation;
using Sitecore.Mvc.Controllers;
using Habitat.News.Model;
using Sitecore.SecurityModel;
using Sitecore.Data;
using Sitecore.Data.Items;
using System;

namespace Habitat.News.Controller
{
    public class CommentsController : SitecoreController
    {       

        [HttpPost]
        public ActionResult SubmitComment(CommentModel commentModel)
        {
            CreateComment(commentModel);
            // Deal with form submission here
            // Hand over to rendering pipeline
            return base.Index();
        }

        //TODO: TIDY THIS MOVE ELSEWHERE hack due to time
        public void CreateComment(CommentModel commentModel)
        {
            Database masterDb = Sitecore.Configuration.Factory.GetDatabase("master");            
            Item parentItem = masterDb.GetItem(Sitecore.Context.Item.ID);
            string name = "Comment_" + Sitecore.DateUtil.IsoNow;
            var template = masterDb.GetTemplate("{D8287D58-67BF-456F-B09E-6A1180819833}");

            using (new Sitecore.SecurityModel.SecurityDisabler())
            {
                Item newItem = parentItem.Add(name, template);
                if (newItem != null)
                {
                    newItem.Editing.BeginEdit();
                    newItem["Name"] = commentModel.CommentName;
                    newItem["Email"] = commentModel.CommentEmail;
                    newItem["Comment"] = commentModel.CommentComment;
                    newItem["Date"] = Sitecore.DateUtil.IsoNow;
                    //TODO: this is horrible fix it
                    newItem.Fields["__Workflow"].Value = "{E38D2FD6-61EA-489F-8E05-F7981B345287}"; //Set workflow
                    newItem.Fields["__Workflow state"].Value = "{4F03E5A9-7A6F-4ED2-B4C7-489824A0BF2F}"; //Set   workflow state to Unposted.
                    newItem.Editing.EndEdit();
                }
            }
        }
    }
}
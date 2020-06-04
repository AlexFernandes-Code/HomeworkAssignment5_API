using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Dynamic;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Web;
using System.Web.Http.Cors;

namespace HomeworkAssignment1_17039917.Models
{
 [EnableCors(origins: "*", headers: "*", methods: "*")]
    public class Authentication
    {
        public HomeworkAssignment3_17039917Entities2 db = new HomeworkAssignment3_17039917Entities2();
        User x = new User();
    
        public User NewGUID(User obj)
        {
            if (obj != null)
            {
                obj.GUID = Guid.NewGuid().ToString();
                obj.GUIDExpiry = DateTime.Now.AddMinutes(30);
                var guids = db.Users.Where(x => x.GUID == obj.GUID).Count();
                if (guids > 0)
                    return (NewGUID(obj));
                else
                {
                    User user = db.Users.Where(z => z.UserID == obj.UserID).FirstOrDefault();      
                    db.Entry(user).CurrentValues.SetValues(obj);
                    db.SaveChanges();
                    return (user);
                }
            }
            return null;
        }
    
        public User RefreshGUIDdate(User obj)
        {
            if (obj != null)
            {
                obj.GUIDExpiry = DateTime.Now.AddMinutes(30);
                {
                    x = db.Users.Where(z => z.UserID == obj.UserID).FirstOrDefault();
                    db.Entry(x).CurrentValues.SetValues(obj);
                    db.SaveChanges();
                    return (x);
                }
            }
            return null;
        }
       
        public bool isLoggedIn(string guid)
        {
            if (guid != null)
            {
                User user = db.Users.Where(x => x.GUID == guid).FirstOrDefault();
                if (user != null && user.GUIDExpiry > DateTime.Now)
                {
                    RefreshGUIDdate(user);
                    return true;
                }
                else
                {
                    return false;
                }                
          
            }
            return false;
        }
  
        public object Login(User objUser)
        {
            try
            {
                db.Configuration.ProxyCreationEnabled = false;
                var hashedPasswword = this.ComputeSha256Hash(objUser.UserPassword);
                var user = NewGUID(db.Users.Where(y => y.UserEmail == objUser.UserEmail && y.UserPassword == hashedPasswword).FirstOrDefault());   
                return (user);          
            }
            catch
            {
                dynamic obj = new ExpandoObject();
                obj.Error = ("Login credentials incorrect. Please try again.");
                return obj;
            }           
        }
         
        public bool Logout(string guid)
        {
            User user = db.Users.Where(x => x.GUID == guid).FirstOrDefault();
            if (isLoggedIn(guid))
            {
                user.GUID = null;
                user.GUIDExpiry = null;
                db.Entry(user).CurrentValues.SetValues(user);
                db.SaveChanges();     
                return true;
            }            
            return false;
        }
      
        public string ComputeSha256Hash(string rawData)
        {
            using (SHA256 sha256Hash = SHA256.Create())
            {
                byte[] bytes = sha256Hash.ComputeHash(Encoding.UTF8.GetBytes(rawData));
                StringBuilder builder = new StringBuilder();
                for (int i = 0; i < bytes.Length; i++)
                {
                    builder.Append(bytes[i].ToString("x2"));
                }
                return builder.ToString();
            }
        }

       

    }
}
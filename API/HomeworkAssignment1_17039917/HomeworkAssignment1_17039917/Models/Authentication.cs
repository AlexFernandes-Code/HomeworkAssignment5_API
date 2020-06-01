using System;
using System.Collections.Generic;
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

        //Refresh user GUID
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
                    x = db.Users.Where(z => z.UserID == obj.UserID).FirstOrDefault();
                    db.Entry(x).CurrentValues.SetValues(obj);
                    db.SaveChanges();
                    return (x);
                }
            }
            return null;
        }

        //Refresh user GUID
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

        //Authenticate user GUID
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

        //Authorize users login credentials
        public User Login(User obj)
        {
            try
            {
                db.Configuration.ProxyCreationEnabled = false;
                var hashedPasswword = this.ComputeSha256Hash(obj.UserPassword);
                var user = NewGUID(db.Users.Where(x => x.UserEmail == obj.UserEmail && x.UserPassword == hashedPasswword).SingleOrDefault());
                return (user);          
            }
            catch
            {

            }
            return null;
        }

        //Logout user
        public User Logout(string guid)
        {
          User user = db.Users.Where(x => x.GUID == guid).FirstOrDefault();
            if (isLoggedIn(guid))
            {
                user = null;
                return user;
            }
            
            return user;
        }

        //Hash password
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
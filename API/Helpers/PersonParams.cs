namespace API.Helpers
{
    public class PersonParams : paginationParams
    {
        public int CurrentUserId { get; set; }
        public int MinAge { get; set; } = 18;
        public int MaxAge { get; set; } = 150;
        public string orderBy { get; set; } = "lastActive";

    }
}
using System.Runtime.CompilerServices;
using Bogus;

public class Query
{
    private readonly Faker<InstructorType> _instructorFaker;
    private readonly Faker<StudentType> _studentFaker;
    private readonly Faker<CourseType> _courseFaker;

    public Query()
    {
        _instructorFaker = new Faker<InstructorType>()
                        .RuleFor(c => c.Id, f => Guid.NewGuid())
                        .RuleFor(c => c.FirstName, f => f.Name.FirstName())
                        .RuleFor(c => c.LastName, f => f.Name.LastName())
                        .RuleFor(c => c.Salary, f => f.Random.Double(10000, 100000));

        _studentFaker = new Faker<StudentType>()
                .RuleFor(c => c.Id, f => Guid.NewGuid())
                .RuleFor(c => c.FirstName, f => f.Name.FirstName())
                .RuleFor(c => c.LastName, f => f.Name.LastName())
                .RuleFor(c => c.Gpa, f => f.Random.Double(1, 4));

        _courseFaker = new Faker<CourseType>()
                .RuleFor(c => c.Id, f => Guid.NewGuid())
                .RuleFor(c => c.Name, f => f.Name.JobTitle())
                .RuleFor(c => c.Subject, f => f.PickRandom<Subject>())
                .RuleFor(c => c.Instructor, f => _instructorFaker.Generate())
                .RuleFor(c => c.Students, f => _studentFaker.Generate(3));
    }

    public IEnumerable<CourseType> GetCourses()
    {
        return _courseFaker.Generate(5);
    }
    public async Task<CourseType> GetCourseById(Guid id)
    {
        await Task.Delay(1000);
        CourseType course = _courseFaker.Generate();
        course.Id = id;
        return course;
    }

    [GraphQLDeprecated("This is not used anymore.")]
    public string Instructions => "Wow ! This works ...";
}
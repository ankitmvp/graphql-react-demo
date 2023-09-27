// Import everything needed to use the `useQuery` hook
import { useQuery, gql, useMutation } from '@apollo/client';

const GET_COURSES = gql`
  {
    courses {
      id
      name
      instructor {
        id
        firstName
        lastName
      }
      students {
        id
        firstName
        lastName
      }
    }
  }
`;

const GET_COURSES_BY_ID = gql`
  query getCoursesByID($id: UUID!) {
    courseById(id: $id) {
      id
      name
      instructor {
        id
        firstName
        lastName
      }
      students {
        id
        firstName
        lastName
      }
    }
  }
`;

const CREATE_COURSE = gql`
  mutation createCourse($input: CourseInputTypeInput) {
    createCourse(courseInput: $input) {
      name
      id
    }
  }
`;
export default function App() {
  const { loading, error, data } = useQuery(GET_COURSES);
  const {
    loading: loading2,
    error: error2,
    data: data2,
  } = useQuery(GET_COURSES_BY_ID, {
    variables: {
      id: '7c13e6bf-85d4-4c55-bf32-0bdd877b8dd5',
    },
  });
  const [createCourse, { data: data3, loading: loading3, error: error3 }] =
    useMutation(CREATE_COURSE, {
      variables: {
        input: {
          instructorId: '36384ad9-5148-465f-9b23-c1c78de83201',
          name: 'Ankit',
          subject: 'HISTORY',
        },
      },
    });
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;

  return (
    <div>
      {data.courses.map((d) => (
        <div key={d.id}>
          <h3>Course ID: </h3>
          {d.id}
          <h3>Course Name: </h3> {d.name}
          <h3>Course Instructor: </h3> {d.instructor.firstName}&nbsp;
          {d.instructor.lastName}
        </div>
      ))}
      {!loading2 ? console.log(data2) : console.log('loading ...')}
      <button onClick={() => createCourse()}>Create a Course</button>
      {console.log(data3)}
    </div>
  );
}

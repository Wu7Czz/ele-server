
import {
    GraphQLSchema,
    GraphQLObjectType
  } from 'graphql';
  // 引入 type 
  import {student} from './student'
  
  // 建立 schema
  export default new GraphQLSchema({
    query: new GraphQLObjectType({
      name: 'Queries',
      fields: {
        student
      }
    })
  })
  
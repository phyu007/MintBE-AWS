// lambdaFunction1/index.js

exports.handler = async (event, context) => {
    try {
      console.log('Lambda function 1 executed successfully!');
      console.log('Event:', JSON.stringify(event, null, 2));
      console.log('Context:', JSON.stringify(context, null, 2));
  
      return {
        statusCode: 200,
        body: JSON.stringify({ message: 'Lambda function 1 executed successfully!' }),
      };
    } catch (error) {
      console.error('Error:', error);
      return {
        statusCode: 500,
        body: JSON.stringify({ error: 'Internal Server Error' }),
      };
    }
  };
  
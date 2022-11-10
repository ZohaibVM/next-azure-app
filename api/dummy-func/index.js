module.exports = async function (context, req, employee) {
  console.log({ context, req, employee });
  context.res = {
    status: 200,
    body: { message: "This is an achievement", count: 0, employees: employee },
  };
};

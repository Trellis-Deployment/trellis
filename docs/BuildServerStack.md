# Build Server Stack

Used the guide here: https://docs.aws.amazon.com/prescriptive-guidance/latest/patterns/run-event-driven-and-scheduled-workloads-at-scale-with-aws-fargate.html

1. Creates a VPC - this is necessary to make the cluster, which is passed to the lambda and used to execute the `ecs.runTask()` method to start the task
1. An IAM role is created that will have permissions to execute tasks - this is passed to the task
1. An ECS cluster is defined and attached to the vpc created before
1. A task is defined - it will spin up the fargate instance with the specified CPU/RAM
1. The task has a container (a docker image) added to it. In our case it is the one we uploaded during installation - the name is hard coded to 'build-server'
   - We attach a log driver as well, so we can see logs for the task - necessary for debugging and outputting build logs from the task
1. We then define a lambda build function (not attached to the API Gateway) which will invoke this task.
   - It is passed several values that are dynamically generated at `sst build` - namely the vpc/cluster/task definitions
   - The function requires a few security policies to be able to run the tasks

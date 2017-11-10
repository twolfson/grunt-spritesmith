// Load in dependencies
var exec = require('child_process').exec;
var quote = require('shell-quote').quote;

// Define utility for running tasks
exports.runTask = function (task) {
  before(function runTask(done) {
    // Relocate to test directory
    var previousDir = process.cwd();
    process.chdir(__dirname + '/../');

    // Execute the cmd and task combination
    var that = this;
    exec(quote(['grunt', task]), function handleExec(err, stdout, stderr) {
      // Save results for later
      that.err = err;
      that.stdout = stdout;
      that.stderr = stderr;

      // Move back to the previous directory
      process.chdir(previousDir);

      // Callback
      done();
    });
  });

  after(function cleanupTask() {
    delete this.err;
    delete this.stdout;
    delete this.stderr;
  });
};

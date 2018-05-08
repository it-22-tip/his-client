// Post data to parent thread
let k = this.Buffer
try {
  self.postMessage({ foo: k })
} catch (err) {
  console.log(err)
}
// Respond to message from parent thread
self.addEventListener('message', (event) => console.log(event))

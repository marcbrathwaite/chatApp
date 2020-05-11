// Utility function to handle autoscroll when new messages are added to screen
export default (messagesRef) => {
  const messages = messagesRef.current
  // Get new message element
  const newMessage = messages.lastElementChild

  // Get Height of new message
  // Get styles of the messages
  const newMessageStyles = getComputedStyle(newMessage)
  const newMessageMargin = parseInt(newMessageStyles.marginBottom)
  const newMessageHeight = newMessage.offsetHeight + newMessageMargin

  // Visible height of messages
  const visibleHeight = messages.offsetHeight

  // Height of messages container
  const containerHeight = messages.scrollHeight

  // How far have i scrolled? Idea of how far from the bottom
  const scrollOffset = messages.scrollTop + visibleHeight

  if (containerHeight - newMessageHeight <= scrollOffset) {
    // Scroll to bottom
    messages.scrollTop = messages.scrollHeight
  }
}
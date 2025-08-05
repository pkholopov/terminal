export const styles = {
  info: 'color: #00ff00; font-size: 1rem; padding: 5px; border-radius: 5px; border: 1px solid #00ff00;',
  output: 'color: #00ff00; font-weight: bold;',
  error: 'color: #ff0000; font-weight: bold; font-size: 1rem;',
}

export const terminalConsole = {
  info: (...args) => console.info('%c' + args[0], styles.info, ...args.slice(1)),
  output: (...args) => console.log('%c' + args[0], styles.output, ...args.slice(1)),
  error: (...args) => console.log('%c' + args[0], styles.error, ...args.slice(1)),
}

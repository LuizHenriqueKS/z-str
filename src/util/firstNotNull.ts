function firstNotNull(...values: any[]): any {
  for (const val of values) {
    if (val != null) {
      return val;
    }
  }
}

export default firstNotNull;

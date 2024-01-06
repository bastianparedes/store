type NestedObject = {
  [key: string]: NestedObject | string | undefined;
};

const files: NestedObject = {
  file1: 'file1',
  folder1: {
    folder11: {
      file111: 'folder1-folder11-file111'
    }
  },
  folder2: {
    file21: 'folder2-file21'
  }
};

const mockedMinioClient = {
  getObject: async (arg0: string) => {
    const paths = arg0.split('/');
    const name = paths.pop();
    if (name === undefined) return undefined;

    let element = files;
    for (const path of paths) {
      const newElement = element?.[path];
      if (typeof newElement === 'string' || newElement === undefined)
        return undefined;
      element = newElement;
    }
    return element?.[name];
  },
  puObject: async () => {}
};

export default mockedMinioClient;

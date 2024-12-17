import { useProjectsStore } from '@/modules/projects/store/projects.store';
import { createPinia, setActivePinia } from 'pinia';

describe('store useProjectsStore', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
    localStorage.clear();
  });

  test('shold return default values', () => {
    const storeProyect = useProjectsStore();

    expect(storeProyect.noProjects).toBe(true);
    expect(storeProyect.projectList).toEqual([]);
    expect(storeProyect.projects).toEqual([]);
    expect(storeProyect.projectsWithCompletion).toEqual([]);
    expect(storeProyect.addProject).toBeInstanceOf(Function);
    expect(storeProyect.addTaskToProject).toBeInstanceOf(Function);
    expect(storeProyect.toggleTask).toBeInstanceOf(Function);
  });

  test('should actiosn addProyect', () => {
    const storeProyect = useProjectsStore();
    const newProyectName = 'New proyect';

    storeProyect.addProject(newProyectName);
    expect(storeProyect.projectList.length).toBe(1);
    expect(storeProyect.projectList).toEqual([
      {
        id: expect.any(String),
        name: newProyectName,
        tasks: [],
      },
    ]);
  });

  test('should load from localStorage', () => {
    const localProject = [
      {
        id: '1',
        name: 'Project 1',
        tasks: [{ id: '1', name: 'task 1' }],
      },
    ];

    localStorage.setItem('projects', JSON.stringify(localProject));

    const store = useProjectsStore();
    const [project1] = store.projects;

    expect(project1).toEqual(localProject?.[0]);
  });

  test('shold return the proyects with completion', () => {
    const fakeProject = [
      {
        id: '1',
        name: 'Project 1',
        tasks: [
          {
            id: '1',
            name: 'tasks 1',
            completedAt: new Date(),
          },
        ],
      },
    ];

    const store = useProjectsStore();
    store.$patch((state) => {
      state.projects = fakeProject;
    });

    expect(store.projectsWithCompletion).toEqual([
      {
        completion: 100,
        id: '1',
        name: 'Project 1',
        taskCount: 1,
      },
    ]);
  });

  test('shold return the proyects with completion', () => {
    const fakeProject = [
      {
        id: '1',
        name: 'Project 1',
        tasks: [
          {
            id: '1',
            name: 'tasks 1',
            completedAt: new Date(),
          },
        ],
      },
    ];

    const store = useProjectsStore();
    store.$patch((state) => {
      state.projects = fakeProject;
    });

    expect(store.projects).toEqual(fakeProject);
  });




});

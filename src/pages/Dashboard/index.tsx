import { Box, Grid } from "@chakra-ui/react";
import { Card } from "../../components/Card";
import { SearchBox } from "../../components/Form/SearchBox";
import { Header } from "../../components/Header";
import { useAuth } from "../../contexts/AuthContext";
import { useTasks } from "../../contexts/TasksContext";
import { useState, useEffect } from "react";

export const Dashboard = () => {
  const { tasks, loadTasks } = useTasks();
  const { user, accessToken } = useAuth();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadTasks(user.id, accessToken).then((res) => setLoading(false));
  }, []);

  return (
    <Box>
      <Header />
      <SearchBox />
      <Grid
        w='100%'
        templateColumns='repeat(auto-fill, minmax(420px, 1fr))'
        gap={10}
        paddingX='8'
        mt='8'
      >
        {tasks.map((task) => (
          <Card key={task.id} task={task} />
        ))}
      </Grid>
    </Box>
  );
};

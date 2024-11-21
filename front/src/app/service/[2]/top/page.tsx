import { List } from "@/components/layout/List";
import { Title } from "@/components/layout/Title";

export default function Page() {
  return (
    <>
      <Title title="トップページ" icon="top" />
      <List title="機能一覧" h={520} />
    </>
  );
}

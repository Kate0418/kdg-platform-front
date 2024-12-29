import { TopIcon } from "@/components/layout/icons/topIcon/topIcon";
import { List } from "@/components/layout/List";
import { Title } from "@/components/layout/Title";

export default function Page() {
  return (
    <>
      <Title label="トップページ">
        <TopIcon />
      </Title>
      <List title="機能一覧" h={520} />
    </>
  );
}

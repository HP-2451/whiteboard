import { Pagination } from "antd";

interface MyPaginationProps {
  total: number,
  current: number,
  onChange: any,
  pageSize: number
}
 
const MyPagination: React.FunctionComponent<MyPaginationProps> = ({total, onChange, current, pageSize}) => {
  return ( // Custom pagination component

        <Pagination
          onChange={onChange}
          total={total}
          current={current}
          pageSize={pageSize}
        />
      );
   
}
 
export default MyPagination;